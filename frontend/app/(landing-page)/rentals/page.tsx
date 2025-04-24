'use client';

import CardApartment from '@/components/apartment/CardApartment';
import { useGetRentalsQuery } from '@/store/actions/rental';

const RentalsPage = () => {
  const { data } = useGetRentalsQuery();
  console.log(data?.data?.rooms);
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
