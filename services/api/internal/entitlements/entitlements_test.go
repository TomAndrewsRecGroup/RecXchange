package entitlements

import "testing"

func TestCanViewMarketplaceAlways(t *testing.T) {
	for _, p := range []string{PlanGuest, PlanEntry, PlanLite, PlanPro, ""} {
		if !CanViewMarketplace(p) {
			t.Fatalf("CanViewMarketplace(%q) = false", p)
		}
	}
}

func TestCanMutate(t *testing.T) {
	if CanMutate(PlanGuest) || CanMutate("") {
		t.Fatal("guest must not mutate")
	}
	for _, p := range []string{PlanEntry, PlanLite, PlanPro} {
		if !CanMutate(p) {
			t.Fatalf("%s should mutate", p)
		}
	}
}

func TestReferralGate(t *testing.T) {
	if CanAccessReferral(PlanGuest) || CanAccessReferral(PlanEntry) {
		t.Fatal("entry/guest must not access referral")
	}
	if !CanAccessReferral(PlanLite) || !CanAccessReferral(PlanPro) {
		t.Fatal("lite/pro must access referral")
	}
	if CanApplyKind(PlanEntry, KindReferral) {
		t.Fatal("entry apply referral")
	}
	if PlanGateCode(KindReferral) != "PLAN_GATE_REFERRAL" {
		t.Fatal("stable code")
	}
}

func TestDirectBps(t *testing.T) {
	cases := []struct {
		plan string
		bps  int
		ok   bool
	}{
		{PlanGuest, 0, false},
		{PlanEntry, 5000, true},
		{PlanLite, 7000, true},
		{PlanPro, 10000, true},
	}
	for _, c := range cases {
		got, ok := DirectRecruiterBps(c.plan)
		if ok != c.ok || got != c.bps {
			t.Fatalf("DirectRecruiterBps(%s)=%d,%v want %d,%v", c.plan, got, ok, c.bps, c.ok)
		}
	}
}

func TestReferralBps(t *testing.T) {
	if _, ok := ReferralRecruiterBps(PlanEntry); ok {
		t.Fatal("entry referral bps")
	}
	if b, ok := ReferralRecruiterBps(PlanLite); !ok || b != 5000 {
		t.Fatalf("lite referral %d %v", b, ok)
	}
	if b, ok := ReferralRecruiterBps(PlanPro); !ok || b != 10000 {
		t.Fatalf("pro referral %d %v", b, ok)
	}
}

func TestQuotesSumTo10000(t *testing.T) {
	plans := []string{PlanEntry, PlanLite, PlanPro}
	kinds := []string{KindDirect, KindXchange, KindReferral}
	for _, kind := range kinds {
		for _, plan := range plans {
			q, err := QuoteFor(kind, plan, 5000, 5000)
			if err != nil {
				if kind == KindReferral && plan == PlanEntry {
					qe, ok := err.(QuoteError)
					if !ok || qe.Code != "PLAN_GATE_REFERRAL" {
						t.Fatalf("expected PLAN_GATE_REFERRAL, got %v", err)
					}
					continue
				}
				t.Fatalf("%s %s: %v", kind, plan, err)
			}
			if q.RecruiterBps+q.RecxBps+q.PartnerBps != BPSTotal {
				t.Fatalf("%s %s sum %d", kind, plan, q.RecruiterBps+q.RecxBps+q.PartnerBps)
			}
		}
	}
}

func TestLiteDirect70_30(t *testing.T) {
	q, err := QuoteDirect(PlanLite)
	if err != nil {
		t.Fatal(err)
	}
	if q.RecruiterBps != 7000 || q.RecxBps != 3000 || q.PartnerBps != 0 {
		t.Fatalf("lite direct %+v", q)
	}
}

func TestProDirect100_0(t *testing.T) {
	q, err := QuoteDirect(PlanPro)
	if err != nil {
		t.Fatal(err)
	}
	if q.RecruiterBps != 10000 || q.RecxBps != 0 {
		t.Fatalf("pro direct %+v", q)
	}
	if q.Display != "Recruiter keeps 100%" {
		t.Fatalf("display %q", q.Display)
	}
}

func TestXchangeDefaultAndNotAParty(t *testing.T) {
	if XchangeDefaultOwnerBps != 5000 {
		t.Fatal(XchangeDefaultOwnerBps)
	}
	q, err := QuoteXchange(0, 0)
	if err != nil {
		t.Fatal(err)
	}
	if q.RecxBps != 0 || q.RecruiterBps != 5000 || q.PartnerBps != 5000 {
		t.Fatalf("%+v", q)
	}
}
