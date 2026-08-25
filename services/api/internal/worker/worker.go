package worker

import (
	"context"
	"log"
	"time"

	"recxchange-v2-api/internal/store"
)

type Worker struct {
	Store store.Store
}

func (w *Worker) DrainOnce(ctx context.Context) error {
	pending, err := w.Store.ListPendingAutomations(ctx)
	if err != nil {
		return err
	}
	for _, a := range pending {
		if err := w.Store.MarkAutomation(ctx, a.ID, "done"); err != nil {
			_ = w.Store.MarkAutomation(ctx, a.ID, "failed")
		}
	}
	return nil
}

func (w *Worker) Loop(ctx context.Context, every time.Duration) {
	t := time.NewTicker(every)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			if err := w.DrainOnce(ctx); err != nil {
				log.Printf("worker: %v", err)
			}
		}
	}
}
