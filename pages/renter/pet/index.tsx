import { useRouter } from "next/router";
import React, { useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { PetApi } from "../../../generated-src/openapi";

export default function Pet() {
  const petApi = new PetApi();
  const router = useRouter();
  let [[error, pets], setState] = useState([undefined, undefined]);
  const userId = router.query.userId as string;
  if (userId) {
    petApi.getPetsByUserId({ userId }).subscribe({
      next: (p) => setState([undefined, p]),
      error: (p) => setState([p, undefined]),
    });
  }
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="grid grid-cols-1 gap-3">
          {pets?.map((pet) => {
            <div className="p-3 border shadow">
              <div className="tk-text-blue text-lg font-medium">
                {pet.breed}
              </div>
              <div className="tk-text-blue">{pet.weight}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
