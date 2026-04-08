export interface User {
   id?: string;
   name: string;
   isCreator: boolean;
   isProducer: boolean;
   accessEndsAt?: Date;
   pledgeCanceledAt?: Date;
}
