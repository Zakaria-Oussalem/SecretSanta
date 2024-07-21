import random
from app.core.config import (
    ERROR_ODD_LIST_COUNT,
    ERROR_EMPTY_USERS_LIST,
    ERROR_USERS_LIST_DUPLICATS,
)


def selection(users_ids: list) -> dict:
    """for each user randomly assign to it another user.
    Repitition is not possible.

    Args:
        user_ids (list): A list containing the user IDs

    Returns:
        dict: A dictionnary in which keys and values are user IDS.
                    It matches users together.
    """

    # make sure the list is not empty:
    if len(users_ids) == 0:
        raise ValueError(ERROR_EMPTY_USERS_LIST)

    # make sure the list contains unique values
    if len(users_ids) != len(set(users_ids)):
        raise ValueError(ERROR_USERS_LIST_DUPLICATS)

    while True:
        shuffeled_ids = users_ids.copy()
        random.shuffle(shuffeled_ids)
        if all(original != shuffeled_ids[i] for i, original in enumerate(users_ids)):
            return dict(zip(users_ids, shuffeled_ids))
