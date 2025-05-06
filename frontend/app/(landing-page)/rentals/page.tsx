'use client';

import CardApartment from '@/components/apartment/CardApartment';
import Loader from '@/components/common/loader';
import { useGetRentalsQuery } from '@/store/actions/rental';

const RentalsPage = () => {
  const { data, isLoading } = useGetRentalsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="py-20 md:mx-14 md:w-[90%]">
      <div className="flex flex-wrap md:flex-row flex-col items-center justify-center gap-10">
        {data?.data?.rooms?.map((room) => (
          <CardApartment key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RentalsPage;
