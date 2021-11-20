import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Header, Warning } from "../../../components";
import { PetApi } from "../../../generated-src/openapi";

export default function Pet() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [[error, pets, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    if (!session) {
      router.push({ pathname: "/api/auth/signin" });
      return;
    }
    let _userId = session.userId as string;
    setState([undefined, undefined, _userId]);
    const petApi = new PetApi();
    let sub = petApi
      .getPetsByUserId({
        userId: _userId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (r) => setState([undefined, r, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady,]);
  return (
    <div>
      <Header
        router={router}
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
