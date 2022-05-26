import EditLease from "../lease/edit"

export default function RenterProfileBuild1() {
    return (
        <div>
            <EditLease
                header_text="Build My Profile"
                next_action_path="/renter/profilebuilder/3">
            </EditLease>
        </div>
    )
}