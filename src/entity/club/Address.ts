import AddressType from "./AddressType";

class Address {
    //
    zipCode: string = '';
    zipAddress: string = '';
    streetAddress: string = '';
    country: string = 'South Korea';
    addressType: AddressType = AddressType.Office;

    constructor(zipCode: string, zipAddress: string, streetAddress: string) {
        //
        this.zipCode = zipCode;
        this.zipAddress = zipAddress;
        this.streetAddress = streetAddress
    }
}

export default Address;