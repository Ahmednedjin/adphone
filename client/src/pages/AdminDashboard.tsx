import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import AddPhoneForm from "@/components/AddPhoneForm";
import EditPhoneForm from "@/components/EditPhoneForm";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState<number | null>(null);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const { data: phones, isLoading, refetch } = trpc.phones.list.useQuery({
    brand: searchBrand || undefined,
    model: searchModel || undefined,
  });

  const deletePhoneMutation = trpc.phones.delete.useMutation({
    onSuccess: () => {
      toast.success("Phone deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete phone");
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this phone?")) {
      deletePhoneMutation.mutate(id);
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Phone Management Dashboard</h1>
          <p className="text-slate-600">Manage and organize your phone database</p>
        </div>

        {/* Search and Add Button */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Search by Brand</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="e.g., Apple, Samsung..."
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Search by Model</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="e.g., iPhone 15..."
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Phone
          </Button>
        </div>

        {/* Add Phone Form */}
        {showAddForm && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Add New Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <AddPhoneForm
                onSuccess={() => {
                  setShowAddForm(false);
                  refetch();
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Phones List */}
        <Card>
          <CardHeader>
            <CardTitle>Phones List</CardTitle>
            <CardDescription>
              {phones?.length || 0} phone{phones?.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : phones && phones.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Brand</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Model</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Added</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phones.map((phone) => (
                      <tr key={phone.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-900 font-medium">{phone.brand}</td>
                        <td className="px-4 py-3 text-slate-700">{phone.model}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs">
                          {new Date(phone.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingPhone(phone.id)}
                              className="gap-1"
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(phone.id)}
                              disabled={deletePhoneMutation.isPending}
                              className="gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">No phones found. Add your first phone!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Phone Modal */}
        {editingPhone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Edit Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <EditPhoneForm
                  phoneId={editingPhone}
                  onSuccess={() => {
                    setEditingPhone(null);
                    refetch();
                  }}
                  onCancel={() => setEditingPhone(null)}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
