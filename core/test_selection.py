from random_selection import selection
import unittest


class TestRandomAssignment(unittest.TestCase):
    def test_selection_successful(self):
        """Test that the selection process functions well with a
        valid users list
        """

        # given
        users_ids = [111, 222, 333, 444, 555, 666]

        # when
        results = selection(users_ids)

        # then

        # Check that no element is mapped to itself
        assert all(
            key != value for key, value in results.items()
        ), "An element is mapped to itself."

        # Check that all values are unique
        assert len(set(results.values())) == len(results), "Not all values are unique."

        # Check that the keys match the original list
        assert set(results.keys()) == set(
            users_ids
        ), "Keys do not match the original list."
