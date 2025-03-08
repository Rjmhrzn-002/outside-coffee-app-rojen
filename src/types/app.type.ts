export interface ICoffee {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: string;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
  image_url: string;
}
