-- Live chat relay table
-- Telegram webhook inserts rows here; SSE stream polls them to deliver
-- team replies to the website visitor in real time.
--
-- Run this once in Supabase Dashboard → SQL Editor.

CREATE TABLE IF NOT EXISTS public.chat_replies (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text        NOT NULL,
  body            text        NOT NULL,
  created_at      timestamptz DEFAULT now() NOT NULL
);

-- Fast lookup: poll by conversation + time
CREATE INDEX IF NOT EXISTS idx_chat_replies_conv_created
  ON public.chat_replies (conversation_id, created_at);

-- Enable RLS (service role key bypasses it, anon key cannot read/write)
ALTER TABLE public.chat_replies ENABLE ROW LEVEL SECURITY;

-- Auto-delete rows older than 24 hours to keep the table lean.
-- Requires pg_cron extension. Enable it in Supabase Dashboard → Database → Extensions.
-- If you don't want pg_cron, just skip this block — rows will accumulate but won't affect functionality.
/*
SELECT cron.schedule(
  'delete-old-chat-replies',
  '0 * * * *',  -- every hour
  $$DELETE FROM public.chat_replies WHERE created_at < now() - interval '24 hours'$$
);
*/
