import { createClient } from '@supabase/supabase-js';

// url, apikey 설정
const supabaseUrl = 'https://tixbtwjusrgaqjcdceed.supabase.co';
const supabaseAPIKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGJ0d2p1c3JnYXFqY2RjZWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3OTQwMzIsImV4cCI6MjA0NjM3MDAzMn0.ZFgfTQVkA5pxVOOhZ3zFeSVN8NMp7OUdCmbzJ_Dh8JQ';

const supabase = createClient(supabaseUrl, supabaseAPIKey);

export default supabase;
