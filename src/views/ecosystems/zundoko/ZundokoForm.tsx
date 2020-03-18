import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormContextValues } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreState } from '~/state/ducks';
import { isZundokoDataReady, getZundoko } from '~/state/ducks/zundoko/selectors';
import { zundokoDataNotReady, zundokoBeingFetched } from '~/state/ducks/zundoko/actions';
import { useFetch } from '~/views/hooks';
import FormContainer from '~/views/atoms/FormContainer';
import ZundokoFormContents, {
  ZundokoFormData,
} from '~/views/organisms/zundoko/ZundokoFormContents';

/**
 * The type of props of ZundokoForm.
 */
export type ZundokoFormProps = Readonly<{
  /** The ID of a zundoko this form treats. */
  entityID: string;

  /**
   * A register method for {@link ZundokoFormData}.
   */
  register: FormContextValues<ZundokoFormData>['register'];

  /**
   * A callback to know whether the data table is ready.
   *
   * @param ready - True if ready; false otherwise.
   */
  setReady: (ready: boolean) => void;
}>;

const ZundokoForm: FunctionComponent<ZundokoFormProps> = ({ entityID, register, setReady }) => {
  const dataReady = useSelector(isZundokoDataReady);
  const fetching = useFetch(dataReady, zundokoDataNotReady(), zundokoBeingFetched(entityID));
  const zd = useSelector((state: StoreState) => getZundoko(state, entityID));
  useEffect(() => setReady(!fetching), [setReady, fetching]);

  if (!zd) {
    return <div>{entityID} is Not Found</div>;
  }

  return (
    <FormContainer>
      {fetching ? <CircularProgress /> : <ZundokoFormContents register={register} entity={zd} />}
    </FormContainer>
  );
};

export default React.memo(ZundokoForm);
