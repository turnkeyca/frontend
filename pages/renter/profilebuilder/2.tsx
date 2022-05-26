import Employment from "../employment/edit"

export default function RenterProfileBuild1() {
    return (
        <div>
            <Employment
                header_text="Build My Profile"
                next_action_path="/renter/profilebuilder/3">
            </Employment>
        </div>
    )
}