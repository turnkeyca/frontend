import Employment from "../employment/edit"

export default function RenterProfileBuild2() {
    return (
        <div>
            <Employment
                header_text="Build My Profile"
                next_action_path="/renter/profilebuilder/lease">
            </Employment>
        </div>
    )
}