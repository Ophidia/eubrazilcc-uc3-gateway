/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

package it.cmcc.ophidiaweb.utils;

public class JSONNull {
	private static final class Null{
		/**
		* There is only intended to be a single instance of the NULL object,
		* so the clone method returns itself.
		*
		* @return NULL.
		*/
		protected final Object clone() {
			return this;
		}

		/**
		 * A Null object is equal to the null value and to itself.
		 *
		 * @param object
		 * An object to test for nullness.
		 * @return true if the object parameter is the JSONObject.NULL object or
		 * null.
		 */
		public boolean equals(Object object) {
			return object == null || object == this;
		}

		/**
		 * Get the "null" string value.
		 *
		 * @return The string "null".
		 */
		public String toString() {
			return "null";
		}
	}
	
	public static final Object NULL=new Null();

	
}

