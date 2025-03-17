import CardApartment from '@/components/apartment/CardApartment';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Filter } from 'lucide-react';

const RentalsPage = () => {
    return (
        <div className='py-20 md:mx-14 w-full'>
            <Dialog>
                <DialogTrigger asChild className=' mb-4'>
                    <Button variant="outline">Filter apartment <Filter /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-wrap md:flex-row flex-col md:justify-between items-center justify-between space-y-8">
                <CardApartment />
                <CardApartment />
                <CardApartment />       
                <CardApartment />
                <CardApartment />
            </div>
        </div>
    );
}

export default RentalsPage;
