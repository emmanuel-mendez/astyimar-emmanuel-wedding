export enum GuestGenders {
  male = "male",
  female = "female"
}

export type Guest = {
  id: string;
  name: string;
  gender: GuestGenders;
  coupon?: number;
};