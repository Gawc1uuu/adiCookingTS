interface image {
  public_id: string;
  url: string;
}

export default interface recipe {
  _id: string;
  title: string;
  method: string;
  ingredients: string[];
  image: image;
  cookingTime: string;
  createdAt: string;
  updatedAt: string;
}
