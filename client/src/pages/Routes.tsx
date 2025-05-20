import { useState, useMemo } from "react";
import { useParseCsv } from "../data/useParseCsv";
import { Route } from "../data/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import BidModal from "../components/modals/BidModal";
import ApplyModal from "../components/modals/ApplyModal";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Routes = () => {
  // State for route data and filtering
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortField, setSortField] = useState<keyof Route>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isBidModalOpen, setBidModalOpen] = useState(false);
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  
  const itemsPerPage = 5;

  // Transform CSV data and handle typing
  const transformRow = (row: any): Route => ({
    id: row.id || row.route_id || "",
    location: row.location || "",
    state: row.state || "",
    zip: row.zip || "",
    type: row.type || "",
    length: parseFloat(row.length) || 0,
    payRate: row.pay_rate || "",
  });

  // Fetch routes data
  const { data: routes, loading, error } = useParseCsv<Route>(
    "/data/routes.csv",
    { transformRow }
  );

  // Get all unique states for the filter
  const states = useMemo(() => {
    if (!routes) return [];
    const uniqueStates = Array.from(new Set(routes.map((route) => route.state)));
    return uniqueStates.sort();
  }, [routes]);

  // Get all unique types for the filter
  const types = useMemo(() => {
    if (!routes) return [];
    const uniqueTypes = Array.from(new Set(routes.map((route) => route.type)));
    return uniqueTypes.sort();
  }, [routes]);

  // Filter and sort routes based on search, filters, and sorting
  const filteredRoutes = useMemo(() => {
    if (!routes) return [];

    return routes
      .filter((route) => {
        const searchLower = search.toLowerCase();
        return (
          (searchLower === "" ||
            route.id.toLowerCase().includes(searchLower) ||
            route.location.toLowerCase().includes(searchLower) ||
            route.zip.toLowerCase().includes(searchLower)) &&
          (stateFilter === "" || route.state === stateFilter) &&
          (typeFilter === "" || route.type === typeFilter)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }
      });
  }, [routes, search, stateFilter, typeFilter, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const displayedRoutes = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredRoutes.slice(start, end);
  }, [filteredRoutes, page, itemsPerPage]);

  // Sort handler
  const handleSort = (field: keyof Route) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Modal handlers
  const openBidModal = (route: Route) => {
    setSelectedRoute(route);
    setBidModalOpen(true);
  };

  const openApplyModal = (route: Route) => {
    setSelectedRoute(route);
    setApplyModalOpen(true);
  };

  const closeBidModal = () => {
    setBidModalOpen(false);
    setSelectedRoute(null);
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedRoute(null);
  };

  // Render loading skeleton
  if (loading) {
    return (
      <section id="routes" className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Available USPS Routes</h2>
          
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-grow" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section id="routes" className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Available USPS Routes</h2>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl text-destructive font-bold mb-4">Error Loading Routes</h3>
            <p className="mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="routes" className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Available USPS Routes</h2>
        
        {/* Search and Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-gray-500" />
                </div>
                <Input
                  id="route-search"
                  placeholder="Search routes by ID, location, or zip code"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Routes Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("id")}
                  >
                    Route ID
                    {sortField === "id" && (
                      sortDirection === "asc" ? <ArrowUp className="inline ml-1" /> : <ArrowDown className="inline ml-1" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("location")}
                  >
                    Location
                    {sortField === "location" && (
                      sortDirection === "asc" ? <ArrowUp className="inline ml-1" /> : <ArrowDown className="inline ml-1" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("type")}
                  >
                    Type
                    {sortField === "type" && (
                      sortDirection === "asc" ? <ArrowUp className="inline ml-1" /> : <ArrowDown className="inline ml-1" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("length")}
                  >
                    Length (mi)
                    {sortField === "length" && (
                      sortDirection === "asc" ? <ArrowUp className="inline ml-1" /> : <ArrowDown className="inline ml-1" />
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("payRate")}
                  >
                    Pay Rate
                    {sortField === "payRate" && (
                      sortDirection === "asc" ? <ArrowUp className="inline ml-1" /> : <ArrowDown className="inline ml-1" />
                    )}
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedRoutes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No routes found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedRoutes.map((route) => (
                    <TableRow key={route.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{route.id}</TableCell>
                      <TableCell>{route.location}, {route.state} {route.zip}</TableCell>
                      <TableCell>{route.type}</TableCell>
                      <TableCell>{route.length.toFixed(1)}</TableCell>
                      <TableCell>{route.payRate}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-primary text-white hover:bg-primary/90 mr-2"
                          size="sm"
                          onClick={() => openBidModal(route)}
                        >
                          Bid
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openApplyModal(route)}
                        >
                          Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
              
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(page * itemsPerPage, filteredRoutes.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredRoutes.length}</span> results
                  </p>
                </div>
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
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      {selectedRoute && (
        <>
          <BidModal 
            isOpen={isBidModalOpen} 
            onClose={closeBidModal} 
            route={selectedRoute} 
          />
          <ApplyModal 
            isOpen={isApplyModalOpen} 
            onClose={closeApplyModal} 
            route={selectedRoute} 
          />
        </>
      )}
    </section>
  );
};

export default Routes;