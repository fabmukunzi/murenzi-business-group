'use client';
import React, { useState, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import SearchInput from '@/components/common/SearchInput';
import { useSearchParams } from 'next/navigation';
import RestaurantMenu from '@/components/restaurant/RestaurantMenu';
import Tents from '@/components/restaurant/Tents';
import { useGetMenuItemsQuery } from '@/store/actions/menu';
import Loader from '@/components/common/loader';

const RestaurantContent = () => {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const [activeTab, setActiveTab] = useState<'all' | 'menu' | 'tent'>('all');
    const { data: menuItem, isLoading: isMenuItemLoading } = useGetMenuItemsQuery({ categoryId: categoryId || '' });    
    

    // const handleSearch = (query: string) => {
    //     const params = new URLSearchParams(searchParams.toString());
    //     if (query) {
    //         params.set('query', query);
    //     } else {
    //         params.delete('query');
    //     }
    //     router.push(`?${params.toString()}`);
    // };

    return (
        <div className="mx-6 md:mx-14 items-center my-16 md:my-24 max-sm:mt-28 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full max-sm:flex-col gap-2">
                <Card className="flex max-sm:w-full flex-row justify-center gap-1 items-center w-fit p-1 rounded-lg shadow-none max-sm:justify-between">
                    <Button
                        size="sm"
                        className="rounded-sm py-0"
                        onClick={() => setActiveTab('all')}
                        variant={activeTab === 'all' ? 'default' : 'secondary'}
                    >
                        All
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-sm"
                        onClick={() => setActiveTab('menu')}
                        variant={activeTab === 'menu' ? 'default' : 'secondary'}
                    >
                        Restaurant Menu
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-sm"
                        onClick={() => setActiveTab('tent')}
                        variant={activeTab === 'tent' ? 'default' : 'secondary'}
                    >
                        Tent
                    </Button>
                </Card>
                {/* <SearchInput onSearch={handleSearch} /> */}
            </div>

            {isMenuItemLoading ? (
                <Loader loading={isMenuItemLoading} />
            ) : (
                <>
                    {(activeTab === 'all' || activeTab === 'menu') && (
                        <RestaurantMenu menu={menuItem?.data?.items ?? []} />
                    )}
                    {(activeTab === 'all' || activeTab === 'tent') && <Tents />}
                </>
            )}
        </div>
    );
};

const Restaurant = () => (
    <Suspense fallback={<Loader loading={true} />}>
        <RestaurantContent />
    </Suspense>
);

export default Restaurant;
