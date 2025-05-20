import { useState, useMemo } from "react";
import { useParseCsv } from "../data/useParseCsv";
import { Solicitation } from "../data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  User,
  Timer,
  DollarSign,
} from "lucide-react";

const Solicitations = () => {
  // State for solicitation data and filtering
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [page, setPage] = useState(1);
  
  const itemsPerPage = 6;

  // Transform CSV data and handle typing
  const transformRow = (row: any): Solicitation => ({
    id: row.id || row.solicitation_id || "",
    title: row.title || "",
    status: row.status || "open",
    description: row.description || "",
    postedDate: row.posted_date || "",
    closingDate: row.closing_date || "",
    experience: parseInt(row.min_experience) || 0,
    duration: parseInt(row.duration) || 0,
    budget: row.budget || "",
  });

  // Fetch solicitations data
  const { data: solicitations, loading, error } = useParseCsv<Solicitation>(
    "/data/solicitations.csv",
    { transformRow }
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500 hover:bg-green-600">Open</Badge>;
      case "closing":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Closing Soon</Badge>;
      case "review":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Under Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter and sort solicitations based on search, filters, and sorting
  const filteredSolicitations = useMemo(() => {
    if (!solicitations) return [];

    const filtered = solicitations.filter((solicitation) => {
      const searchLower = search.toLowerCase();
      return (
        (searchLower === "" ||
          solicitation.title.toLowerCase().includes(searchLower) ||
          solicitation.id.toLowerCase().includes(searchLower) ||
          solicitation.description.toLowerCase().includes(searchLower)) &&
        (statusFilter === "" || solicitation.status === statusFilter)
      );
    });

    switch (sortOption) {
      case "date-desc":
        return [...filtered].sort(
          (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      case "date-asc":
        return [...filtered].sort(
          (a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        );
      case "closing-asc":
        return [...filtered].sort(
          (a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
        );
      default:
        return filtered;
    }
  }, [solicitations, search, statusFilter, sortOption]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSolicitations.length / itemsPerPage);
  const displayedSolicitations = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredSolicitations.slice(start, end);
  }, [filteredSolicitations, page, itemsPerPage]);

  // Render loading skeleton
  if (loading) {
    return (
      <section id="solicitations" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Active Solicitations</h2>
          
          <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-grow" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border border-gray-200 flex flex-col">
                <CardHeader className="p-4 bg-primary-light">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 border-t">
                  <Skeleton className="h-8 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section id="solicitations" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Active Solicitations</h2>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl text-destructive font-bold mb-4">Error Loading Solicitations</h3>
            <p className="mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitations" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Active Solicitations</h2>
        
        {/* Filters */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LuSearch className="text-gray-500" />
                </div>
                <Input
                  id="solicitation-search"
                  placeholder="Search by title, ID, or description"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closing">Closing Soon</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="closing-asc">Closing Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Solicitation Cards */}
        {displayedSolicitations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium mb-4">No solicitations found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSolicitations.map((solicitation) => (
              <Card key={solicitation.id} className="border border-gray-200 flex flex-col">
                <CardHeader className="p-4 bg-primary-light text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">{solicitation.title}</h3>
                    {getStatusBadge(solicitation.status)}
                  </div>
                  <p className="text-sm mt-1">Solicitation #{solicitation.id}</p>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <p className="text-sm text-gray-700 mb-4">
                    {solicitation.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Posted: {formatDate(solicitation.postedDate)}</span>
                    <span>Closes: {formatDate(solicitation.closingDate)}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <LuUser className="text-gray-400 mr-2" />
                      <span>Min. Experience: {solicitation.experience} years</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <LuTimer className="text-gray-400 mr-2" />
                      <span>Est. Duration: {solicitation.duration} months</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <LuDollarSign className="text-gray-400 mr-2" />
                      <span>Budget: {solicitation.budget}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4 bg-gray-50">
                  <Button 
                    className="w-full"
                    disabled={solicitation.status === "review"}
                  >
                    {solicitation.status === "review" ? "No Longer Available" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(Math.max(1, page - 1));
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, current page, and 1 on each side of current page
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNum);
                          }}
                          isActive={pageNum === page}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  
                  // Show ellipsis for breaks in sequence
                  if (
                    (pageNum === 2 && page > 3) ||
                    (pageNum === totalPages - 1 && page < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <span className="px-4 py-2">...</span>
                      </PaginationItem>
                    );
                  }
                  
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(Math.min(totalPages, page + 1));
                    }}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default Solicitations;
