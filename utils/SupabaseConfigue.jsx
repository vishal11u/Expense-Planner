import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lizndakbkniexwedvrib.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpem5kYWtia25pZXh3ZWR2cmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDg4NDgsImV4cCI6MjA0MTgyNDg0OH0.7qCJZbILG1V0Orgp7NNb8JHmcdchqfnVaIrwVvI5X9s"
);
