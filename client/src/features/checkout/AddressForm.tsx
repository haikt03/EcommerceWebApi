import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";
import { useEffect } from "react";
import agent from "../../app/api/agent";

const AddressForm = () => {
    const { control, formState, setValue } = useFormContext();

    useEffect(() => {
        agent.Account.fetchAddress().then((response) => {
            if (response) {
                setValue("fullName", response.fullName);
                setValue("address1", response.address1);
                setValue("address2", response.address2);
                setValue("city", response.city);
                setValue("state", response.state);
                setValue("zip", response.zip);
                setValue("country", response.country);
                setValue("saveAddress", false);
            }
        });
    }, [setValue]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput
                        control={control}
                        name="fullName"
                        label="Full name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput
                        control={control}
                        name="address1"
                        label="Address 1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput
                        control={control}
                        name="address2"
                        label="Address 2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name="city" label="City" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput
                        control={control}
                        name="state"
                        label="State"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput
                        control={control}
                        name="zip"
                        label="Zip code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput
                        control={control}
                        name="country"
                        label="Country"
                    />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <AppCheckbox
                    disabled={!formState.isDirty}
                    name="saveAddress"
                    label="Save this as default address"
                    control={control}
                />
            </Grid>
        </>
    );
};

export default AddressForm;
