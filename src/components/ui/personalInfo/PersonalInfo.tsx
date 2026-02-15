'use client'

import { useAddressStore } from "@/store";

export const PersonalInfo = () => {
    const address = useAddressStore(state => state.address);
    return (
        <div className="mb-10">
            <p className="text-lg">{address.firstName} {address.lastName}</p>
            <p>{address.address}</p>
            <p>{address.address2}</p>
            <p>{address.postalCode}</p>
            <p>{address.city}, {address.country}</p>
            <p>{address.phone}</p>
        </div>
    )
}
