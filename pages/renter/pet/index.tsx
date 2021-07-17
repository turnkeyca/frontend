import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { Warning } from "../../../components/warning";
import { PetApi } from "../../../generated-src/openapi";

export default function Pet() {
  const router = useRouter();
  let [[error, pets, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    setState([undefined, undefined, _userId]);
    const petApi = new PetApi();
    let sub = petApi.getPetsByUserId({ userId: _userId }).subscribe({
      next: (r) => setState([undefined, r, _userId]),
      error: (e) => setState([e, undefined, _userId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);
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
        {pets !== undefined && pets.length === 0 && (
          <Warning>No pet records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {pets?.map((pet) => {
            <div
              className="p-3 border shadow"
              onClick={() =>
                router.push({
                  pathname: "/renter/pet/view",
                  query: { userId, petId: pet.id },
                })
              }
            >
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
