import AddressType from "./AddressType";

class Address {
    //
    zipCode: string = '';
    zipAddress: string = '';
    streetAddress: string ='';
    country: string = 'South Korea';
    addressType: AddressType = AddressType.Office;

    constructor(zipCode: string, zipAddress: string, streetAddress: string) {
        //
        this.zipCode = zipCode;
        this.zipAddress = zipAddress;
        this.streetAddress = streetAddress
    }

    static getHomeAddressSample(): Address {
        //
        const address: Address = new Address('134-111', 'Geumcheon-gu', '333');

        address.addressType = AddressType.Home;

        return address;
    }
}

export default Address;