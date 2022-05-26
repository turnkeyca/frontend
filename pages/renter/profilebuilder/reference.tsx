import Reference from "../reference/edit"

/** @todo: Create a page to add references....it's a little weird */ 
export default function RenterProfileBuildReference() {
    return (
        <div>
            <Reference
                header_text="Build My Profile"
                next_action_path="/renter/profilebuilder/pets">
            </Reference>
        </div>
    )
}