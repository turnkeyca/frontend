import EditContact from "../contact/edit"

export default function RenterProfileBuild1() {
    return (
        <EditContact
            header_text="Build My Profile"
            next_action_path="/renter/profilebuilder/employment">
        </EditContact>
    )
}