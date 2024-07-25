"use server";

import { fetchUserById } from "@/lib/data";

{/* <Carousel className="w-full max-w-xs">
  <CarouselContent>
    {imageURLs.map((imageURL, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Image
                src={imageURL}
                alt={`Property Image ${index}`}
                width={500}
                height={500}
              />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>; */}

/* onChange={(event) => {
  const images = event.target.files;
  field.onChange(images ?? undefined);
  if (!images) {
    return setImageURLs([
      "https://static.vecteezy.com/system/resources/previews/000/378/951/original/home-vector-icon.jpg",
    ]);
  }
  const urls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (!ev.target || !ev.target.result) return;
      urls.push(ev.target.result as string);
      if (urls.length === images.length) {
        setImageURLs(urls);
      }
    };
    reader.readAsDataURL(images[i]);
  }
}} */

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id);
  return (
    <ul>
      {Object.entries(user).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
