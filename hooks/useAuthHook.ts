import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null); 


  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user); 
    };

    checkUser();

    
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null); 
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user };
}
