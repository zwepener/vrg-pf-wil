"use server";

import Panel from "./panel";

export default async function Page() {
  return (
    <div className="flex flex-col items-center p-5 m-5 grow">
      <Panel />
    </div>
  );
}
