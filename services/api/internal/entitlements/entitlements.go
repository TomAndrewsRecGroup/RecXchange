// Package entitlements is the single source of plan gates and split bps.
// Handlers must never branch on plan strings; they call these functions.
package entitlements

const (
	BPSTotal               = 10_000
	XchangeDefaultOwnerBps = 5_000
)

const (
	PlanGuest = "guest"
	PlanEntry = "entry"
	PlanLite  = "lite"
	PlanPro   = "pro"
)

const (
	KindDirect   = "direct"
	KindXchange  = "xchange"
	KindReferral = "referral"
)

// CanViewMarketplace is always true: the marketplace is open, greyed for guests.
func CanViewMarketplace(plan string) bool {
	_ = plan
	return true
}

// CanMutate is false only for guests (and empty/unknown treated as guest).
func CanMutate(plan string) bool {
	return plan != "" && plan != PlanGuest
}

func CanWorkDirect(plan string) bool {
	switch plan {
	case PlanEntry, PlanLite, PlanPro:
		return true
	default:
		return false
	}
}

func CanApplyDirect(plan string) bool {
	return CanWorkDirect(plan)
}

func CanAccessReferral(plan string) bool {
	switch plan {
	case PlanLite, PlanPro:
		return true
	default:
		return false
	}
}

func CanPostXchange(plan string) bool {
	return CanWorkDirect(plan)
}

func CanPostDirect(plan string) bool {
	return CanWorkDirect(plan)
}

func CanPostReferral(plan string) bool {
	return CanAccessReferral(plan)
}

func CanApplyXchange(plan string) bool {
	return CanPostXchange(plan)
}

func CanApplyReferral(plan string) bool {
	return CanAccessReferral(plan)
}

func CanApplyKind(plan, kind string) bool {
	switch kind {
	case KindDirect:
		return CanApplyDirect(plan)
	case KindReferral:
		return CanApplyReferral(plan)
	case KindXchange:
		return CanApplyXchange(plan)
	default:
		return false
	}
}

func CanPostKind(plan, kind string) bool {
	switch kind {
	case KindDirect:
		return CanPostDirect(plan)
	case KindReferral:
		return CanPostReferral(plan)
	case KindXchange:
		return CanPostXchange(plan)
	default:
		return false
	}
}

func CanWorkKind(plan, kind string) bool {
	switch kind {
	case KindDirect:
		return CanWorkDirect(plan)
	case KindReferral:
		return CanAccessReferral(plan)
	case KindXchange:
		return CanPostXchange(plan)
	default:
		return CanMutate(plan)
	}
}

func PlanGateCode(kind string) string {
	switch kind {
	case KindReferral:
		return "PLAN_GATE_REFERRAL"
	case KindDirect:
		return "PLAN_GATE_DIRECT"
	case KindXchange:
		return "PLAN_GATE_XCHANGE"
	default:
		return "PLAN_GATE"
	}
}

func PlanGateMessage(kind string) string {
	switch kind {
	case KindReferral:
		return "Referral roles require Lite or Pro."
	case KindDirect:
		return "Direct splits require Entry, Lite, or Pro."
	case KindXchange:
		return "Xchange roles require Entry, Lite, or Pro."
	default:
		return "Your plan cannot do this."
	}
}

// DirectRecruiterBps returns recruiter share in bps for RecX Direct.
func DirectRecruiterBps(plan string) (int, bool) {
	switch plan {
	case PlanEntry:
		return 5_000, true
	case PlanLite:
		return 7_000, true
	case PlanPro:
		return 10_000, true
	default:
		return 0, false
	}
}

// ReferralRecruiterBps returns recruiter share in bps for Referral roles.
func ReferralRecruiterBps(plan string) (int, bool) {
	switch plan {
	case PlanLite:
		return 5_000, true
	case PlanPro:
		return 10_000, true
	default:
		return 0, false
	}
}

type Quote struct {
	RecxBps      int    `json:"recx_bps"`
	RecruiterBps int    `json:"recruiter_bps"`
	PartnerBps   int    `json:"partner_bps"`
	Display      string `json:"display"`
}

type QuoteError struct {
	Code    string
	Message string
}

func (e QuoteError) Error() string { return e.Code + ": " + e.Message }

func QuoteDirect(plan string) (Quote, error) {
	rec, ok := DirectRecruiterBps(plan)
	if !ok {
		return Quote{}, QuoteError{Code: "PLAN_GATE_DIRECT", Message: PlanGateMessage(KindDirect)}
	}
	recx := BPSTotal - rec
	return Quote{
		RecxBps:      recx,
		RecruiterBps: rec,
		PartnerBps:   0,
		Display:      formatDisplay(rec, recx, 0, KindDirect),
	}, nil
}

func QuoteReferral(plan string) (Quote, error) {
	rec, ok := ReferralRecruiterBps(plan)
	if !ok {
		return Quote{}, QuoteError{Code: "PLAN_GATE_REFERRAL", Message: PlanGateMessage(KindReferral)}
	}
	recx := BPSTotal - rec
	return Quote{
		RecxBps:      recx,
		RecruiterBps: rec,
		PartnerBps:   0,
		Display:      formatDisplay(rec, recx, 0, KindReferral),
	}, nil
}

func QuoteXchange(ownerBps, partnerBps int) (Quote, error) {
	if ownerBps == 0 && partnerBps == 0 {
		ownerBps = XchangeDefaultOwnerBps
		partnerBps = BPSTotal - ownerBps
	}
	if ownerBps+partnerBps != BPSTotal {
		return Quote{}, QuoteError{
			Code:    "SPLIT_INVALID",
			Message: "Xchange owner+partner must equal 10000 bps.",
		}
	}
	return Quote{
		RecxBps:      0,
		RecruiterBps: ownerBps,
		PartnerBps:   partnerBps,
		Display:      formatDisplay(ownerBps, 0, partnerBps, KindXchange),
	}, nil
}

func QuoteFor(kind, plan string, ownerBps, partnerBps int) (Quote, error) {
	switch kind {
	case KindDirect:
		return QuoteDirect(plan)
	case KindReferral:
		return QuoteReferral(plan)
	case KindXchange:
		return QuoteXchange(ownerBps, partnerBps)
	default:
		return Quote{}, QuoteError{Code: "INVALID_KIND", Message: "Unknown role kind."}
	}
}

func formatDisplay(recruiter, recx, partner int, kind string) string {
	if kind == KindXchange {
		return "Owner " + itoa(recruiter/100) + "% / partner " + itoa(partner/100) + "% (RecXchange not a party)"
	}
	if recx == 0 {
		return "Recruiter keeps 100%"
	}
	return "Recruiter " + itoa(recruiter/100) + "% / RecXchange " + itoa(recx/100) + "%"
}

func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	neg := n < 0
	if neg {
		n = -n
	}
	var buf [12]byte
	i := len(buf)
	for n > 0 {
		i--
		buf[i] = byte('0' + n%10)
		n /= 10
	}
	if neg {
		i--
		buf[i] = '-'
	}
	return string(buf[i:])
}
