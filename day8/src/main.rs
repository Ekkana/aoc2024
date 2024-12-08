use std::{fs, time::Instant};

fn part_1(positions: &Vec<(char, i8, i8)>, input: &String) {
    let mut catchers = Vec::new();

    for (i, pos) in positions.iter().enumerate() {
        for (j, pos2) in positions.iter().enumerate() {
            if pos.0 == pos2.0 && i != j {
                let pos_i_diff = pos.1 as isize - pos2.1 as isize;
                let pos_j_diff = pos.2 as isize - pos2.2 as isize;

                // check if new position is within the bounds of the grid
                if pos_i_diff + pos.1 as isize >= 0
                    && pos_j_diff + pos.2 as isize >= 0
                    && pos_i_diff + (pos.1 as isize) < input.lines().count() as isize
                    && pos_j_diff + (pos.2 as isize)
                        < input.lines().nth(0).unwrap().chars().count() as isize
                    && !catchers
                        .contains(&(pos_i_diff + pos.1 as isize, pos_j_diff + pos.2 as isize))
                {
                    catchers.push((pos_i_diff + pos.1 as isize, pos_j_diff + pos.2 as isize));
                }

                let pos_i_diff2 = pos2.1 as isize - pos.1 as isize;
                let pos_j_diff2 = pos2.2 as isize - pos.2 as isize;

                // check if new position is within the bounds of the grid
                if pos_i_diff2 + pos2.1 as isize >= 0
                    && pos_j_diff2 + pos2.2 as isize >= 0
                    && pos_i_diff2 + (pos2.1 as isize) < input.lines().count() as isize
                    && pos_j_diff2 + (pos2.2 as isize)
                        < input.lines().nth(0).unwrap().chars().count() as isize
                    && !catchers
                        .contains(&(pos_i_diff2 + pos2.1 as isize, pos_j_diff2 + pos2.2 as isize))
                {
                    catchers.push((pos_i_diff2 + pos2.1 as isize, pos_j_diff2 + pos2.2 as isize));
                }
            }
        }
    }

    println!("{}", catchers.len());
}

fn part_2(positions: &Vec<(char, i8, i8)>, i_len: i8, j_len: i8) {
    let mut catchers = Vec::new();
    let start = Instant::now();

    for (i, pos) in positions.iter().enumerate() {
        for (j, pos2) in positions.iter().enumerate() {
            if pos.0 == pos2.0 && i != j {
                // Add current number
                if !catchers.contains(&(pos.1, pos.2)) {
                    catchers.push((pos.1, pos.2));
                }

                // Offsets
                let pos_i_diff = pos.1 - pos2.1;
                let pos_j_diff = pos.2 - pos2.2;

                let mut point_location = (pos_i_diff + pos.1, pos_j_diff + pos.2);

                while point_location.0 >= 0
                    && point_location.1 >= 0
                    && point_location.0 < i_len
                    && point_location.1 < j_len
                {
                    if !catchers.contains(&(point_location.0, point_location.1)) {
                        catchers.push((point_location.0, point_location.1));
                    }
                    point_location = (pos_i_diff + point_location.0, pos_j_diff + point_location.1);
                }
            }
        }
    }

    let duration = start.elapsed();

    println!("Time: {:?}", duration);
    println!("{}", catchers.len());
}

fn main() {
    let input = fs::read_to_string("input/input1.txt").expect("Smth went wrong");

    let mut positions = Vec::new();

    for (i, line) in input.lines().enumerate() {
        for (j, char) in line.chars().enumerate() {
            if char != '.' {
                positions.push((char, i as i8, j as i8));
            }
        }
    }
    let i_len = input.lines().count() as i8;
    let j_len = input.lines().nth(0).unwrap().chars().count() as i8;

    part_1(&positions, &input);
    part_2(&positions, i_len, j_len);
}
