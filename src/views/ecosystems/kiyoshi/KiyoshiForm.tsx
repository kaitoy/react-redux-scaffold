import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UseFormMethods } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreState } from '~/state/ducks';
import { isKiyoshiDataReady, getKiyoshi } from '~/state/ducks/kiyoshi/selectors';
import { kiyoshiDataNotReady, kiyoshiBeingFetched } from '~/state/ducks/kiyoshi/actions';
import { useFetch } from '~/views/hooks';
import FormContainer from '~/views/atoms/FormContainer';
import KiyoshiFormContents, {
  KiyoshiFormData,
} from '~/views/organisms/kiyoshi/KiyoshiFormContents';

/**
 * The type of props of KiyoshiForm.
 */
export type KiyoshiFormProps = Readonly<{
  /** The ID of a kiyoshi this form treats. */
  entityID: string;

  /**
   * A register method for {@link KiyoshiFormData}.
   */
  register: UseFormMethods<KiyoshiFormData>['register'];

  /**
   * A callback to know whether the data table is ready.
   *
   * @param ready - True if ready; false otherwise.
   */
  setReady: (ready: boolean) => void;
}>;

const KiyoshiForm: FunctionComponent<KiyoshiFormProps> = ({ entityID, register, setReady }) => {
  const dataReady = useSelector(isKiyoshiDataReady);
  const fetching = useFetch(dataReady, kiyoshiDataNotReady(), kiyoshiBeingFetched(entityID));
  const kiyoshi = useSelector((state: StoreState) => getKiyoshi(state, entityID));
  useEffect(() => setReady(!fetching), [setReady, fetching]);

  if (!kiyoshi) {
    return <div>{entityID} is Not Found</div>;
  }

  return (
    <FormContainer>
      {fetching ? (
        <CircularProgress />
      ) : (
        <KiyoshiFormContents register={register} entity={kiyoshi} />
      )}
    </FormContainer>
  );
};

export default React.memo(KiyoshiForm);
