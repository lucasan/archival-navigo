
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Archive, Database, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Bush Finding Aids Prototypes</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore different approaches to archival finding aids and research tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link 
            to="/foia-finding-aids-listing" 
            className="block group h-full"
          >
            <Card className="h-full border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-primary/10 p-6 flex justify-center">
                <Database className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-lg text-center group-hover:text-primary transition-colors">FOIA Finding Aids Listing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-slate-600">
                Browse all FOIA case numbers and their subjects
              </CardContent>
              <CardFooter className="justify-center pt-0">
                <Button variant="ghost" size="sm" className="text-xs group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link 
            to="/finding-aid" 
            className="block group h-full"
          >
            <Card className="h-full border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-blue-50 p-6 flex justify-center">
                <FileText className="h-10 w-10 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-lg text-center group-hover:text-blue-500 transition-colors">Finding Aid with Series</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-slate-600">
                View the standard finding aid with Series organization
              </CardContent>
              <CardFooter className="justify-center pt-0">
                <Button variant="ghost" size="sm" className="text-xs group-hover:text-blue-500 transition-colors">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link 
            to="/finding-aid-no-containers" 
            className="block group h-full"
          >
            <Card className="h-full border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-indigo-50 p-6 flex justify-center">
                <Archive className="h-10 w-10 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-lg text-center group-hover:text-indigo-500 transition-colors">FOIA Finding Aid</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-slate-600">
                View the FOIA finding aid without container organization
              </CardContent>
              <CardFooter className="justify-center pt-0">
                <Button variant="ghost" size="sm" className="text-xs group-hover:text-indigo-500 transition-colors">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link 
            to="/research-room-search" 
            className="block group h-full"
          >
            <Card className="h-full border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-amber-50 p-6 flex justify-center">
                <Search className="h-10 w-10 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-lg text-center group-hover:text-amber-500 transition-colors">Research Room Search</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-slate-600">
                Search through the research room records
              </CardContent>
              <CardFooter className="justify-center pt-0">
                <Button variant="ghost" size="sm" className="text-xs group-hover:text-amber-500 transition-colors">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
        
        <div className="text-center text-sm text-slate-500">
          <p>Bush Presidential Library Finding Aid Prototypes</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
