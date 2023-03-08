import Movies from "@/components/Movies";
import { Navbar } from "@/components";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
       
      <Navbar />
      <Movies />
     </QueryClientProvider>
      
    </>
  );
}
