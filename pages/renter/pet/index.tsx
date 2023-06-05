import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Error, Footer, Header, Icon, Warning } from "../../../components";
import { PetApi } from "../../../generated-src/openapi";

export default function Pet() {
  const router = useRouter();
  let [[error, pets, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const petApi = useMemo(() => new PetApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    let sub = petApi
      .getPetsByUserId({
        userId: _userId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (e) => setState([undefined, e, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, petApi]);
  return (
    <div>
      <Header
        router={router}
        title="My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Pet Info
          </span>
        </div>
        {pets !== undefined && pets.length === 0 && (
          <Warning>No pet records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {pets?.map((pet) => (
            <div
              key={pet.id}
              className="p-3 border rounded shadow cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: "/renter/pet/view",
                  query: { userId, token:router.query.token , petId: pet.id },
                })
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="tk-text-blue text-lg font-medium">
                    {pet.petType}
                  </div>
                  <div className="tk-text-blue">{pet.breed}</div>
                  <div className="text-gray-600 text-sm">{pet.sizeType}</div>
                </div>
                <div className="flex tk-text-blue">
                  <Icon
                    name="edit"
                    handleClick={() =>
                      router.push({
                        pathname: "/renter/pet/edit",
                        query: { userId, token:router.query.token , petId: pet.id },
                      })
                    }
                  />
                  <Icon
                    className="mr-2"
                    name="delete"
                    handleClick={() =>
                      petApi
                        .deletePet({
                          id: pet.id,
                          token: router.query.token as string,
                        })
                        .subscribe()
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/pet/edit",
                query: router.query,
              })
            }
            variant="primary"
          >
            <Icon name="add"></Icon> ADD PET
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
