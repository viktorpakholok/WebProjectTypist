import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Registration() {
    return <>
    <section className="informationPlaceholder">

        <aside className="informationPlaceholder-left">

            <Input placeholderText="username"></Input>
            <Input placeholderText="email"></Input>
            <Input placeholderText="verify email"></Input>
            <Input placeholderText="password"></Input>
            <Input placeholderText="verify password"></Input>

        </aside>

    </section>
        
    </>
}

export default Registration;
