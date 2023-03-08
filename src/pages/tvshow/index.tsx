import { TvShows } from "@/components"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function Tv() {
  return (
    <QueryClientProvider client={queryClient}>
       <TvShows />
     </QueryClientProvider>
    
  )
}

export default Tv