import { useForm } from "react-hook-form";
function CreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const CheckPassword = (e) => {
    e.preventDefault();
    return e.target.value === watch("password") ? true : false;
  };

  const onSubmit = (data) => console.log("Data", data);

  return (
    <div>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="m-3">
          <label htmlFor="Name">First Name</label>
          <input type="text" {...register("first_name", { required: true })} />
          {errors.first_name && (
            <span className="text-danger">This Field is required</span>
          )}
        </div>

        <div className="m-3">
          <label htmlFor="Name">Last Name</label>
          <input type="text" {...register("last_name", { required: true })} />
          {errors.last_name && (
            <span className="text-danger">This Field is required</span>
          )}
        </div>

        <div className="m-3">
          <label htmlFor="Name">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && (
            <span className="text-danger">
              Please Enter Valid Email Address
            </span>
          )}
        </div>

        <div className="m-3">
          <label htmlFor="Name">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Min length is 6",
              },
            })}
          />
        </div>

        <div className="m-3">
          <label htmlFor="Name">Confirm Password</label>
          <input type="password" onChange={(e) => CheckPassword(e)} />
        </div>

        <div className="m-3">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
