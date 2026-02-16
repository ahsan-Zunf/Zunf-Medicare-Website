import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";
import { FileText, Lock, User, Stethoscope, Activity, Pill, Search, Filter, Download, Share2 } from "lucide-react";

export default function EHRPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 relative">
        {/* Coming Soon Badge - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border-2 border-primary/40 backdrop-blur-md shadow-lg">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Coming Soon</span>
          </div>
        </div>

        {/* Portal Dashboard - Disabled Preview */}
        <div className="opacity-60 pointer-events-none">
          {/* Portal Header */}
          <section className="bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border-b border-border/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">EHR Portal</h1>
                  <p className="text-sm text-muted-foreground mt-1">Your Complete Health Records</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/40">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">John Doe</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portal Dashboard */}
          <section className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 border-border/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Records</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <FileText className="h-8 w-8 text-primary/30" />
                  </div>
                </Card>
                <Card className="p-4 border-border/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Test Results</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <Activity className="h-8 w-8 text-primary/30" />
                  </div>
                </Card>
                <Card className="p-4 border-border/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Prescriptions</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <Pill className="h-8 w-8 text-primary/30" />
                  </div>
                </Card>
                <Card className="p-4 border-border/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Visits</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <Stethoscope className="h-8 w-8 text-primary/30" />
                  </div>
                </Card>
              </div>

              {/* Main Portal Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Search and Filters */}
                  <Card className="p-4 border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search records, tests, prescriptions..."
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border/40 bg-background/50 text-sm"
                          disabled
                        />
                      </div>
                      <button className="p-2 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors" disabled>
                        <Filter className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </Card>

                  {/* Recent Records */}
                  <Card className="p-6 border-border/40">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Recent Records</h2>
                      <button className="text-sm text-muted-foreground hover:text-foreground" disabled>
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-3 rounded-lg border border-border/20 bg-muted/10">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-4 w-4 text-primary/30" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">Medical Record #{item}</p>
                            <p className="text-xs text-muted-foreground/70">No date available</p>
                          </div>
                          <button className="p-1.5 rounded hover:bg-muted/50" disabled>
                            <Download className="h-4 w-4 text-muted-foreground/50" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Test Results */}
                  <Card className="p-6 border-border/40">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Test Results</h2>
                      <button className="text-sm text-muted-foreground hover:text-foreground" disabled>
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[1, 2].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-3 rounded-lg border border-border/20 bg-muted/10">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Activity className="h-4 w-4 text-accent/30" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">Lab Test #{item}</p>
                            <p className="text-xs text-muted-foreground/70">No results available</p>
                          </div>
                          <button className="p-1.5 rounded hover:bg-muted/50" disabled>
                            <Download className="h-4 w-4 text-muted-foreground/50" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card className="p-6 border-border/40">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors text-left" disabled>
                        <FileText className="h-4 w-4 text-muted-foreground/50" />
                        <span className="text-sm text-muted-foreground">Add New Record</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors text-left" disabled>
                        <Share2 className="h-4 w-4 text-muted-foreground/50" />
                        <span className="text-sm text-muted-foreground">Share Records</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors text-left" disabled>
                        <Download className="h-4 w-4 text-muted-foreground/50" />
                        <span className="text-sm text-muted-foreground">Export All</span>
                      </button>
                    </div>
                  </Card>

                  {/* Health Timeline */}
                  <Card className="p-6 border-border/40">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Health Timeline</h2>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                          <div className="w-0.5 h-12 bg-muted-foreground/20 mt-1"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium text-muted-foreground">No events yet</p>
                          <p className="text-xs text-muted-foreground/70">Timeline will appear here</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Prescriptions */}
                  <Card className="p-6 border-border/40">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Active Prescriptions</h2>
                    </div>
                    <div className="text-center py-8">
                      <Pill className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground/70">No active prescriptions</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}


