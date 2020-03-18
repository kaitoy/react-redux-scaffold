import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContextValues } from 'react-hook-form';
import MainToolbar, { MainToolbarProps } from '~/views/organisms/MainToolbar';
import { User } from '~/state/ducks/user/models';
import { userBeingPosted } from '~/state/ducks/user/actions';
import { isUserDataBeingPosted } from '~/state/ducks/user/selectors';
import { UserFormData } from '~/views/organisms/user/UserFormContents';

/**
 * The type of props of UserFormToolbar.
 */
type UserFormToolbarProps = Readonly<
  Pick<MainToolbarProps, 'buttonsDisabled'> & {
    /**
     * The handleSubmit method of react-hook-form for {@link DataTableFormData}
     * that is used to create the event handler for the delete button.
     */
    handleSubmit: FormContextValues<UserFormData>['handleSubmit'];

    /** A callback called when the submission of the entity is completed. */
    handleSubmissionCompleted: (id: User['id']) => void;
  }
>;

const UserFormToolbar: FunctionComponent<UserFormToolbarProps> = ({
  handleSubmit,
  buttonsDisabled,
  handleSubmissionCompleted,
}) => {
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const posting = useSelector(isUserDataBeingPosted);
  const dispatch = useDispatch();
  const handleSubmitButtonClick = useCallback(
    handleSubmit((user) => {
      setSubmissionStarted(true);
      dispatch(userBeingPosted(user));
    }),
    [handleSubmit],
  );
  useEffect(() => {
    handleSubmit(({ id }) => {
      if (submissionStarted && !posting) {
        handleSubmissionCompleted(id);
      }
    })();
  }, [submissionStarted, posting, handleSubmissionCompleted, handleSubmit]);

  return (
    <>
      <MainToolbar
        title="User"
        onSubmitButtonClick={handleSubmitButtonClick}
        buttonsDisabled={buttonsDisabled || posting}
      />
    </>
  );
};

export default React.memo(UserFormToolbar);
