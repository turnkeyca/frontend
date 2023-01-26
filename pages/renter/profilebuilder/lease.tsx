import EditLease from "../lease/edit"

export default function RenterProfileBuild3() {
    return (
        <div>
            <EditLease
                header_text="Build My Profile"
                next_action_path="/renter/profilebuilder/general">
            </EditLease>
        </div>
    )
}