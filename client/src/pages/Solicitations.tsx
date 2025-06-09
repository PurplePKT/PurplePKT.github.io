import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { ViewDetailsModal } from "@/components/modals/ViewDetailsModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Timer, DollarSign, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Solicitation {
  id: string;
  location: string;
  miles: number;
  hours: number;
  bid_due: string;
  duration: number;
  pay_rate: string;
}

function Solicitations() {
  const [solicitationsData, setSolicitationsData] = useState<Solicitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("miles-desc");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLatestCsv = async () => {
      try {
        let csvUrl;
        if (window.location.hostname.includes("github.io")) {
          csvUrl = "/data/solicitations.csv";
        } else {
          const latestCsvResponse = await fetch('/api/latest-solicitations-csv');
          const { latestFile } = await latestCsvResponse.json();
          const csvUrl = `/data/${latestFile}`;
        }
        const csvResponse = await fetch(csvUrl);
        const csvText = await csvResponse.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            const transformed = results.data.map((row: any) => ({
              id: row.id || "",
              location: row.location || "",
              miles: parseFloat(row.miles) || 0,
              hours: parseFloat(row.hours) || 0,
              bid_due: row.bid_due || "",
              duration: parseInt(row.duration) || 0,
              pay_rate: row.pay_rate || "",
            }));
            setSolicitationsData(transformed);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };
    fetchLatestCsv();
  }, []);

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

  const filteredSolicitations = useMemo(() => {
    if (!solicitationsData) return [];
    const filtered = solicitationsData.filter((solicitation) => {
      const searchLower = search.toLowerCase();
      return (
        searchLower === "" ||
        (solicitation.location ? solicitation.location.toLowerCase().includes(searchLower) : false) ||
        (solicitation.id ? String(solicitation.id).toLowerCase().includes(searchLower) : false)
      );
    });

    switch (sortOption) {
      case "miles-desc":
        return [...filtered].sort((a, b) => b.miles - a.miles);
      case "miles-asc":
        return [...filtered].sort((a, b) => a.miles - b.miles);
      case "hours-desc":
        return [...filtered].sort((a, b) => b.hours - a.hours);
      case "hours-asc":
        return [...filtered].sort((a, b) => a.hours - b.hours);
      case "duration-desc":
        return [...filtered].sort((a, b) => b.duration - a.duration);
      case "duration-asc":
        return [...filtered].sort((a, b) => a.duration - b.duration);
      default:
        return filtered;
    }
  }, [solicitationsData, search, sortOption]);

  const totalPages = Math.ceil(filteredSolicitations.length / itemsPerPage);
  const displayedSolicitations = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredSolicitations.slice(start, end);
  }, [filteredSolicitations, page, itemsPerPage]);

  if (loading) {
    return (
      <section id="solicitations" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Active Solicitations
          </h2>
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

  if (error) {
    return (
      <section id="solicitations" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Active Solicitations
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl text-destructive font-bold mb-4">
              Error Loading Solicitations
            </h3>
            <p className="mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitations" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          Active Solicitations
        </h2>
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-gray-500" size={16} />
                </div>
                <Input
                  id="solicitation-search"
                  placeholder="Search by location or ID"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles-desc">
                    Miles (High to Low)
                  </SelectItem>
                  <SelectItem value="miles-asc">Miles (Low to High)</SelectItem>
                  <SelectItem value="hours-desc">
                    Hours (High to Low)
                  </SelectItem>
                  <SelectItem value="hours-asc">Hours (Low to High)</SelectItem>
                  <SelectItem value="duration-desc">
                    Duration (High to Low)
                  </SelectItem>
                  <SelectItem value="duration-asc">
                    Duration (Low to High)
                  </SelectItem>
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
              <Card
                key={solicitation.id}
                className="border border-gray-200 flex flex-col"
              >
                <CardHeader className="p-4 bg-primary-light text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">
                      <MapPin className="inline mr-2" size={16} />
                      {solicitation.location}
                    </h3>
                  </div>
                  <p className="text-sm mt-1">
                    Solicitation #{solicitation.id}
                  </p>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <span>Miles: {solicitation.miles}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span>Hours: {solicitation.hours}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span>Bid Due: {formatDate(solicitation.bid_due)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Timer className="text-gray-400 mr-2" size={16} />
                      <span>Duration: {solicitation.duration} months</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="text-gray-400 mr-2" size={16} />
                      <span>Pay Rate: {solicitation.pay_rate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4 bg-gray-50">
                  <Button
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    View Details
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
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
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
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Modal */}
        <ViewDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}

export default Solicitations;
