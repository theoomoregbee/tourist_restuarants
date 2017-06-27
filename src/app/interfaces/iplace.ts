export interface IPlace {
    place_id: string;
    name: string;
    icon: string;
    types: string[];
    location: { lat: number, lng: number };
    opening_hours?: { open_now: boolean, weekday_text: any[] };
    rating:number;
    photos: string[];
    vicinity:string;
}
