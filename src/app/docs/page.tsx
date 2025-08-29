import { Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DocsPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container max-w-4xl">
        <Badge variant="outline">Documentation</Badge>
        <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Welcome to Desklet Docs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This is your central hub for learning how to integrate with and extend the Desklet platform.
          Whether you're building a custom integration or want to leverage our API, you'll find everything you need right here.
        </p>
        
        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold">Getting Started</h2>
          <p className="mt-2 text-muted-foreground">
            The best place to start is our "Getting Started" guide. It will walk you through authenticating with our API and making your first request.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold">API Authentication</h2>
          <p className="mt-2 text-muted-foreground">
            To use the Desklet API, you'll need an API key. You can generate one from your dashboard under Settings &gt; Developer.
            All API requests must be authenticated by including your key in the `Authorization` header.
          </p>
          <pre className="bg-muted p-4 rounded-lg mt-4 overflow-x-auto">
            <code className="font-code text-sm">
              {`// All API requests should be authenticated
curl "https://api.desklet.com/v1/rooms" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </code>
          </pre>
        </div>

        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold">Example: Fetching Bookings</h2>
          <p className="mt-2 text-muted-foreground">
            Here's a quick example of how to fetch a list of bookings using our API.
          </p>
          <pre className="bg-muted p-4 rounded-lg mt-4 overflow-x-auto">
            <code className="font-code text-sm">
              {`import axios from 'axios';

const getBookings = async () => {
  try {
    const response = await axios.get('https://api.desklet.com/v1/bookings', {
      headers: {
        'Authorization': \`Bearer \${process.env.DESKLET_API_KEY}\`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

getBookings();`}
            </code>
          </pre>
        </div>
        
        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold flex items-center gap-2"><Code /> API Status</h2>
           <p className="mt-2 text-muted-foreground">
            Check our status page for real-time updates on API performance and uptime.
          </p>
          <div className="mt-4 flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="font-medium">All Systems Operational</p>
          </div>
        </div>

      </div>
    </div>
  );
}
