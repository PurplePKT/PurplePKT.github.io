import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FileText, Users, ClipboardList, Github } from "lucide-react";

const CsvDocumentation = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">CSV Data Documentation</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          This guide explains how to update the CSV files to maintain the Purple Pocket LLC website.
          All updates should be committed to the GitHub repository to be reflected on the site.
        </p>
        
        <Tabs defaultValue="routes">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="routes">Routes CSV</TabsTrigger>
            <TabsTrigger value="solicitations">Solicitations CSV</TabsTrigger>
            <TabsTrigger value="executives">Executives JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="routes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LuFileText className="h-5 w-5" /> Routes CSV File Structure
                </CardTitle>
                <CardDescription>
                  The routes CSV file contains all available USPS routes displayed on the Routes page.
                  Update this file when new routes become available or when existing routes change.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-3">File Location</h3>
                <p className="mb-4 font-mono bg-muted p-2 rounded-md">
                  /client/public/data/routes.csv
                </p>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Required Columns</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Column Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">id</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Unique identifier for the route</TableCell>
                      <TableCell>R12345</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">location</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>City or area name</TableCell>
                      <TableCell>San Francisco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">state</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Two-letter state code</TableCell>
                      <TableCell>CA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">zip</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>ZIP code for the route</TableCell>
                      <TableCell>94103</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">type</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Type of route (City, Rural, Highway)</TableCell>
                      <TableCell>City</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">length</TableCell>
                      <TableCell>Number</TableCell>
                      <TableCell>Route length in miles</TableCell>
                      <TableCell>15.3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">pay_rate</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Payment rate for the route</TableCell>
                      <TableCell>$25.75/hr</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Example CSV Format</h3>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                  id,location,state,zip,type,length,pay_rate<br/>
                  R12345,San Francisco,CA,94103,City,15.3,$25.75/hr<br/>
                  R67890,Chicago,IL,60611,City,12.7,$24.50/hr<br/>
                  R24680,Austin,TX,78701,Rural,28.5,$22.80/hr
                </pre>
                
                <Alert className="mt-6">
                  <LuInfo className="h-4 w-4" />
                  <AlertDescription>
                    Do not add, remove, or rename columns. Keep the same column structure to ensure compatibility with the website.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="solicitations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LuClipboard className="h-5 w-5" /> Solicitations CSV File Structure
                </CardTitle>
                <CardDescription>
                  The solicitations CSV file contains all active USPS solicitations displayed on the Solicitations page.
                  Update this file when new solicitations are posted or when statuses change.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-3">File Location</h3>
                <p className="mb-4 font-mono bg-muted p-2 rounded-md">
                  /client/public/data/solicitations.csv
                </p>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Required Columns</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Column Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">id</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Unique identifier for the solicitation</TableCell>
                      <TableCell>SOL-2023-0045</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">title</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Title of the solicitation</TableCell>
                      <TableCell>City Route Bidding - San Francisco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">status</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Status (open, closing, review)</TableCell>
                      <TableCell>open</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">description</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Detailed description of the solicitation</TableCell>
                      <TableCell>Seeking bids for 5 city delivery routes...</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">posted_date</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Date when posted (YYYY-MM-DD)</TableCell>
                      <TableCell>2023-05-10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">closing_date</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Date when closing (YYYY-MM-DD)</TableCell>
                      <TableCell>2023-06-15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">min_experience</TableCell>
                      <TableCell>Number</TableCell>
                      <TableCell>Minimum years of experience required</TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">duration</TableCell>
                      <TableCell>Number</TableCell>
                      <TableCell>Estimated duration in months</TableCell>
                      <TableCell>12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">budget</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Budget range for the solicitation</TableCell>
                      <TableCell>$25-28/hr</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Example CSV Format</h3>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                  id,title,status,description,posted_date,closing_date,min_experience,duration,budget<br/>
                  SOL-2023-0045,"City Route Bidding - San Francisco",open,"Seeking bids for 5 city delivery routes in the San Francisco metropolitan area.",2023-05-10,2023-06-15,2,12,"$25-28/hr"<br/>
                  SOL-2023-0038,"Rural Delivery Contract - Texas",closing,"Contractor needed for rural mail delivery in eastern Texas.",2023-04-22,2023-05-25,3,24,"$23-25/hr"
                </pre>
                
                <Alert className="mt-6">
                  <LuInfo className="h-4 w-4" />
                  <AlertDescription>
                    For status values, use only "open", "closing", or "review". Using other values may cause display issues.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="executives" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LuUsers className="h-5 w-5" /> Executives JSON File Structure
                </CardTitle>
                <CardDescription>
                  The executives JSON file contains information about company leadership displayed on the About page.
                  Update this file when executive information changes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-3">File Location</h3>
                <p className="mb-4 font-mono bg-muted p-2 rounded-md">
                  /client/public/data/executives.json
                </p>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Required Properties</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">id</TableCell>
                      <TableCell>Number</TableCell>
                      <TableCell>Unique identifier for the executive</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">name</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Full name of the executive</TableCell>
                      <TableCell>Sarah Johnson</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">title</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Job title of the executive</TableCell>
                      <TableCell>Chief Executive Officer</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bio</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Biographical description</TableCell>
                      <TableCell>Sarah has over 20 years of experience...</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">imageUrl</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>URL to the executive's image</TableCell>
                      <TableCell>https://images.unsplash.com/photo-1573496359142-b8d87734a5a2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <h3 className="text-lg font-medium mb-3 mt-6">Example JSON Format</h3>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                  {`[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "title": "Chief Executive Officer",
    "bio": "Sarah has over 20 years of experience in logistics and supply chain management.",
    "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
  },
  {
    "id": 2,
    "name": "Michael Rodriguez",
    "title": "Chief Operations Officer",
    "bio": "Michael brings 15 years of experience in transportation logistics.",
    "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a"
  }
]`}
                </pre>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">How to Update Files on GitHub</h3>
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>Navigate to the GitHub repository for the Purple Pocket LLC website</li>
                    <li>Go to the respective file location in the repository</li>
                    <li>Click the "Edit" (pencil) icon in the upper right of the file view</li>
                    <li>Make your changes to the file, ensuring you maintain the proper format</li>
                    <li>Scroll down to the "Commit changes" section</li>
                    <li>Add a brief description of your changes in the commit message field</li>
                    <li>Click "Commit changes" to save your updates</li>
                    <li>The GitHub Actions workflow will automatically deploy your changes</li>
                  </ol>
                  
                  <div className="flex items-center mt-6 p-4 bg-muted rounded-md">
                    <LuGithub className="h-6 w-6 mr-3" />
                    <div>
                      <h4 className="font-medium">Need Access?</h4>
                      <p className="text-sm">Contact the IT department to get access to the GitHub repository.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CsvDocumentation;
