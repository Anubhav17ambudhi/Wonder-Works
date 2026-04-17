import React, { useState, useEffect } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Label } from '../../components/ui/Label';
import { Select } from '../../components/ui/Select';
import { api } from '../../services/api';
import { CheckCircle } from 'lucide-react';

export default function FileComplaint() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useRHForm();
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedLocationId = watch("location");

  useEffect(() => {
    api.get('/area/all')
      .then(res => {
         if(res.data?.areas) setAreas(res.data.areas);
         else if(Array.isArray(res.data)) setAreas(res.data);
      })
      .catch(err => console.error("Failed to fetch areas", err));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if(data.phone) formData.append('phone', data.phone);
    if(data.street_address) formData.append('person_address', data.street_address);
    
    const selectedAreaObj = areas.find(a => a._id === data.location);
    if (selectedAreaObj) {
      formData.append('area', selectedAreaObj.name);
      formData.append('zipCode', selectedAreaObj.zipCode);
    }

    formData.append('locality', data.locality);
    formData.append('description', data.description);
    
    if (data.photo?.[0]) {
      formData.append('photo', data.photo[0]);
    }

    try {
      const res = await api.post('/complaint/fileComplaint', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmittedId(res.data?.complaint?.complaint_id || res.data?.complaint_id || "Successfully Submitted");
      reset();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong while submitting your complaint.");
    } finally {
      setLoading(false);
    }
  };

  const selectedArea = areas.find(a => a._id === selectedLocationId);
  const availableLocalities = selectedArea?.localities || [];

  if (submittedId) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="max-w-md w-full text-center py-10">
          <CardContent className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Complaint Submitted!</h2>
            <p className="text-muted-foreground mb-6">Your complaint has been successfully registered.</p>
            <div className="bg-muted p-4 rounded-md mb-6 w-full">
              <p className="text-sm font-medium">Tracking ID:</p>
              <p className="text-xl font-bold tracking-wider">{submittedId}</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Save this ID — it was also sent to your email. Use it to track your complaint status.</p>
            <Button onClick={() => setSubmittedId(null)}>File Another Complaint</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">File a Complaint</CardTitle>
          <CardDescription>Report an issue in your locality. Please provide accurate details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="p-3 bg-muted/50 rounded-md border text-sm text-foreground space-y-1">
               <p className="font-medium">Instructions:</p>
               <p className="text-muted-foreground">
                 Please provide all necessary details. Fields marked with <span className="text-destructive font-bold">*</span> are mandatory.
                 The category will be automatically assigned by our AI system.
               </p>
            </div>

            {errorMsg && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {errorMsg}
              </div>
            )}
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input id="name" {...register("name", { required: "Name is required" })} placeholder="John Doe" />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" {...register("email", { required: "Email is required" })} placeholder="john@example.com" />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register("phone")} placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="text-lg font-medium">Complaint Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Area <span className="text-destructive">*</span></Label>
                  <Select id="location" {...register("location", { required: "Area is required" })}>
                    <option value="">Select an Area</option>
                    {areas.map(area => (
                      <option key={area._id} value={area._id}>{area.name}</option>
                    ))}
                  </Select>
                  {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="locality">Locality / Landmark <span className="text-destructive">*</span></Label>
                  <Select id="locality" {...register("locality", { required: "Locality is required" })} disabled={!selectedLocationId || availableLocalities.length === 0}>
                    <option value="">
                      {!selectedLocationId ? "Select an Area first" : availableLocalities.length === 0 ? "No localities found" : "Select Locality"}
                    </option>
                    {availableLocalities.map((loc, idx) => (
                      <option key={idx} value={loc}>{loc}</option>
                    ))}
                  </Select>
                  {errors.locality && <p className="text-xs text-destructive">{errors.locality.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Describe the issue in detail..."
                  className="min-h-[120px]"
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Attach Photo (Optional)</Label>
                <Input id="photo" type="file" accept="image/*" {...register("photo")} className="cursor-pointer file:cursor-pointer" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Complaint"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
