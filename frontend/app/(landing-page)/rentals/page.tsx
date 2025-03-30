import CardApartment from '@/components/apartment/CardApartment';

const RentalsPage = () => {
    return (
        <div className='py-20 md:mx-14 w-full'>

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
