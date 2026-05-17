export interface User {
   id?: string;
   name: string;
   firstName: string;
   isCreator: boolean;
   isProducer: boolean;
   accessEndsAt?: Date;
   pledgeCanceledAt?: Date;
}
